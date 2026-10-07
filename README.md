# CardioFlow — built site

This repository holds **only the compiled output** of CardioFlow, so that it can
be served from GitHub Pages. The source lives elsewhere and is not published
here.

**Live site:** https://coderta.github.io/cardioflow-demo/

## Not a medical device

CardioFlow is an educational simulation built on simplified, internally
consistent physiological models. It does not provide medical advice, diagnosis
or clinically validated predictions. Every number it reports describes a virtual
scenario defined by its sliders, never a real person. The assumption register at
`/about` lists all 58 documented simplifications, including the 7 the project
judges highest impact.

## Attribution, which the licences require

The anatomical meshes under `anatomy/` are redistributed here, so the obligations
that come with them travel with this repository. `LICENSE` carries them in full.

- **BodyParts3D**, © The Database Center for Life Science, licensed under
  CC Attribution-Share Alike 2.1 Japan. This is a **share-alike** licence: the
  converted `.glb` bundles are adapted material and carry the same licence.
- **Body surfaces and lungs**: Kristen Browne, Heidi Schlehlein, Bruce W. Herr II,
  Ellen Quardokus, Andreas Bueckle, Katy Börner. 2024. HuBMAP CCF 3D Reference
  Object Library. humanatlas.io/3d-reference-library. Licensed CC BY 4.0.
- **Draco** decoder under `draco/`, © The Draco Authors, Apache 2.0.

## What is not in this build

The account tier is absent by design. An Apple Health archive dropped into
`/import` is parsed entirely in your own browser and the subject lasts as long
as the tab. Nothing is uploaded, stored or transmitted, because there is no
server here to receive it.
