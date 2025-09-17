import os
import shutil
import sys

"""
Scans the directory where the script is located.
For each subdirectory that doesn't contain '-old' in its name,
it checks if the folder has n or more files.
If it does, it moves the files to a new folder with the original name suffixed by '-old'.
n is a command-line argument, defaulting to 100.
"""


def minimize_folders(file_count_threshold=100):
    current_directory = os.getcwd()
    print(f"Scanning directory: {current_directory}")
    print(f"Using file count threshold: {file_count_threshold}")

    moved_summary = {}

    # Iterate through all items in the current directory.
    for item_name in os.listdir(current_directory):
        item_path = os.path.join(current_directory, item_name)

        # Process only directories that do not contain "-old"
        if os.path.isdir(item_path) and "-old" not in item_name:
            try:
                # Get a list of files in the directory
                files = [f for f in os.listdir(item_path) if os.path.isfile(os.path.join(item_path, f))]
                file_count = len(files)

                print(f"Checking folder: '{item_name}', File count: {file_count}")

                if file_count >= file_count_threshold:
                    print(f"Folder '{item_name}' has {file_count_threshold} or more files. Archiving...")

                    # Define the target directory name and path
                    target_folder_name = f"{item_name}-old"
                    target_folder_path = os.path.join(current_directory, target_folder_name)

                    # Create the target directory if it doesn't exist
                    os.makedirs(target_folder_path, exist_ok=True)

                    print(f"Moving files from '{item_name}' to '{target_folder_name}'...")
                    # Move each file to the target directory
                    moved_count = 0
                    for file_to_move in files:
                        source_path = os.path.join(item_path, file_to_move)
                        destination_path = os.path.join(target_folder_path, file_to_move)
                        try:
                            shutil.move(source_path, destination_path)
                            moved_count += 1
                        except Exception as e:
                            print(f"Failed to move '{file_to_move}': {e}")

                    if moved_count:
                        moved_summary[item_name] = moved_count
                        print(f"{moved_count} files moved from '{item_name}' to '{target_folder_name}'.")
                    else:
                        print(f"No files were moved from '{item_name}'.")

            except Exception as e:
                print(f"Could not process folder '{item_name}'. Error: {e}")
        elif os.path.isdir(item_path):
            print(f"Ignoring folder: '{item_name}'")

    return moved_summary


if __name__ == "__main__":
    threshold = 100
    if len(sys.argv) > 1:
        try:
            threshold = int(sys.argv[1])
        except ValueError:
            print("Invalid number provided for threshold. Using default of 100.")

    summary = minimize_folders(threshold)
    print("\nScript finished.")

    if summary:
        print("\nSummary:")
        for folder, count in summary.items():
            print(f"[{folder}]: {count} files moved")
    else:
        print("No files moved.")
