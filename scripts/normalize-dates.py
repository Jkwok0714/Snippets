import os
import re

def unique_name(path):
    """Return a non-colliding filepath by appending _1, _2, ... before the extension."""
    base, ext = os.path.splitext(path)
    candidate = path
    i = 1
    while os.path.exists(candidate):
        candidate = f"{base}_{i}{ext}"
        i += 1
    return candidate

def normalize_filename(name):
    # Patterns:
    # 1) YY-MM-DD...  -> already normalized
    # 2) YYYY-MM-DD... -> convert to YY-MM-DD...
    # 3) YYYYMMDD...   -> convert to YY-MM-DD...
    p_yy = re.compile(r'^(\d{2})-(\d{2})-(\d{2})(.*)$')
    p_yyyy_hy = re.compile(r'^(\d{4})-(\d{2})-(\d{2})(.*)$')
    p_compact = re.compile(r'^(\d{4})(\d{2})(\d{2})(.*)$')

    m = p_yy.match(name)
    if m:
        return None  # already normalized

    m = p_yyyy_hy.match(name)
    if m:
        yy = m.group(1)[-2:]
        mm = m.group(2)
        dd = m.group(3)
        rest = m.group(4)
        return f"{yy}-{mm}-{dd}{rest}"

    m = p_compact.match(name)
    if m:
        yy = m.group(1)[-2:]
        mm = m.group(2)
        dd = m.group(3)
        rest = m.group(4)
        return f"{yy}-{mm}-{dd}{rest}"

    return None  # doesn't match any handled format

def main():
    cwd = os.getcwd()
    for entry in os.listdir(cwd):
        src_path = os.path.join(cwd, entry)
        if not os.path.isfile(src_path):
            continue

        new_name = normalize_filename(entry)
        if not new_name:
            continue

        dst_path = os.path.join(cwd, new_name)
        if os.path.abspath(src_path) == os.path.abspath(dst_path):
            continue

        if os.path.exists(dst_path):
            dst_path = unique_name(dst_path)

        try:
            os.rename(src_path, dst_path)
            print(f"Renamed: {entry} -> {os.path.basename(dst_path)}")
        except Exception as e:
            print(f"Failed to rename {entry}: {e}")

if __name__ == "__main__":
    main()
