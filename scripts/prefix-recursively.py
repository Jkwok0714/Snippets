import os
import re

def sanitize(s):
    """Make a safe prefix from directory name."""
    return re.sub(r'[^A-Za-z0-9._-]+', '_', s)

def unique_name(path):
    """Return a non-colliding filepath by appending _1, _2, ... before the extension."""
    base, ext = os.path.splitext(path)
    candidate = path
    i = 1
    while os.path.exists(candidate):
        candidate = f"{base}_{i}{ext}"
        i += 1
    return candidate

def prefix_files_in_subdirs(root=None):
    if root is None:
        root = os.getcwd()
    root = os.path.abspath(root)

    for dirpath, dirnames, filenames in os.walk(root):
        # skip top-level directory
        if os.path.abspath(dirpath) == root:
            continue

        parent = os.path.basename(dirpath)
        if not parent:
            continue

        prefix = sanitize(parent) + "_"

        for fname in filenames:
            # skip hidden files (optional) and skip already prefixed files
            if fname.startswith(prefix):
                continue

            src = os.path.join(dirpath, fname)
            new_fname = prefix + fname
            dst = os.path.join(dirpath, new_fname)

            if os.path.abspath(src) == os.path.abspath(dst):
                continue

            if os.path.exists(dst):
                dst = unique_name(dst)

            try:
                os.rename(src, dst)
                print(f"Renamed: {os.path.relpath(src, root)} -> {os.path.relpath(dst, root)}")
            except Exception as e:
                print(f"Failed to rename {src}: {e}")

if __name__ == "__main__":
    prefix_files_in_subdirs()
