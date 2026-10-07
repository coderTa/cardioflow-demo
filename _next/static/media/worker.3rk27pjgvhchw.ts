/// <reference lib="webworker" />

import { parseArchive, type ParseProgress } from './parse';

/**
 * The importer, off the main thread.
 *
 * Parsing a large archive is tens of seconds of solid work. On the main thread
 * that is tens of seconds of a frozen tab, with no scrolling, no animation and
 * no way to cancel, which reads as a crash rather than as progress. So the
 * whole thing runs here and reports as it goes.
 *
 * This file is deliberately almost empty. Everything worth testing lives in
 * `parse.ts` and the modules under it, where it can be exercised in
 * milliseconds without a worker, a DOM or a browser anywhere near it. A worker
 * that contained logic would be a worker whose logic was tested by hand.
 *
 * NOTHING HERE TOUCHES THE NETWORK. The archive arrives as a `File` from the
 * reader's own disk and leaves as a couple of dozen numbers. What happens to
 * those numbers afterwards is decided elsewhere.
 */

export type ImportRequest = { kind: 'parse'; file: File; windowDays?: number };

export type ImportResponse =
  | { kind: 'progress'; progress: ParseProgress }
  | { kind: 'done'; observations: Awaited<ReturnType<typeof parseArchive>> }
  | { kind: 'failed'; message: string };

const scope = self as unknown as DedicatedWorkerGlobalScope;

scope.addEventListener('message', (event: MessageEvent<ImportRequest>) => {
  const request = event.data;
  if (request?.kind !== 'parse') return;

  void (async () => {
    try {
      const observations = await parseArchive(request.file.stream(), {
        windowDays: request.windowDays,
        onProgress: (progress) => post({ kind: 'progress', progress }),
      });
      post({ kind: 'done', observations });
    } catch (error) {
      /*
        The message is shown to the reader, so it has to be a sentence rather
        than a stack trace. `parseArchive` already phrases the one failure a
        reader can actually act on, which is having picked the wrong zip.
      */
      post({
        kind: 'failed',
        message:
          error instanceof Error
            ? error.message
            : 'The archive could not be read. It may be damaged, or the download may not have finished.',
      });
    }
  })();
});

function post(message: ImportResponse): void {
  scope.postMessage(message);
}
