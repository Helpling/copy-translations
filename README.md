# copy-translations

Bulk copy some translation keys from one phrase.com projects to another.
The process isn't completely automated, there are some steps that have to be done manually

## Steps

1. Go to the original projects and export / download all the locales we need. We should export them as "Simple JSON". Other formats are not supported. You keep there all the keys. Only the specified ones are going to be in the new files.
2. Create a map.json file where the mapping between original and new key names are specified.

```
    {
        "original_ns.original_key1": "new_ns.new_key1",
        "original_ns.original_key2": "new_ns.new_key2"
    }
```

3. Run the script specifying the source folder (where the original translations files are), the map.json and the output folder
4. Upload the generated files in the new phrase.com project.

## Script simple usage

```
node index.js --source ./example/source --map ./example/map.json --output ./example/output
```

## Followup

- It would be amazing to automatically export / import keys using phrase.com apis
