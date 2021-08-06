from sys import argv
from os import listdir
from os.path import isfile, join, splitext
from re import sub


def get_uppercase(string):
    return sub(r'(?<!^)(?=[A-Z])', '_', string).upper()


def get_export_string(file, use_uppercase):
    filename = splitext(file)[0]
    basename = get_uppercase(filename) if use_uppercase else filename

    return f"export {{ default as {basename} }} from \"./{filename}\";"


def create_single_index(path):
    modules = [get_export_string(file, "graphql" in path)
               for file in listdir(path)
               if isfile(join(path, file))
               and file[-3:] == ".js"
               and file[0] != "."
               and file != "index.js"]

    with open(join(path, "index.js"), "w") as indexFile:
        indexFile.write("\n".join(modules))


def auto():
    create_single_index("./src/components")
    create_single_index("./src/hooks")
    create_single_index("./src/routes")
    create_single_index("./src/utils")
    create_single_index("./src/graphql/mutations")
    create_single_index("./src/graphql/queries")


if __name__ == "__main__":
    if len(argv) == 1:
        auto()
    else:
        create_single_index(argv)
