# classeur-personnel

Un index par collection pour mes notes et mes affaires. Je conserve mes secrets sous le nom fonds-de-tiroir.

## Usage

Node.js 22+ ; aucune dépendance externe. Depuis ce dossier :

```powershell
node main.mjs example.json exemple-sortie.md
node --test test.mjs
```

Entrée : `entries`, liste de `{title, collection, reference}`, tous non vides. Une liste vide produit un index vide. Sortie : index Markdown groupé par collection puis trié par titre. Une référence est un texte de rangement, jamais une instruction à exécuter ; aucun fichier référencé n'est ouvert, déplacé ou publié. Les séparateurs du tableau sont échappés. Les exemples sont fictifs.

La sortie est écrite seulement après validation complète et remplace le fichier de sortie choisi. Utiliser un chemin distinct de l'entrée. JSON UTF-8 sans BOM. Le dossier de destination doit exister. Erreur de lecture/JSON/validation/écriture : message sur stderr, code 1. Aucun accès réseau.

## Exemple

Voir `example.json` et `exemple-sortie.md`. Les exemples n'utilisent que des métadonnées ou des textes fictifs.

Licence MIT. Version 0.1.0.

