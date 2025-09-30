import os
import shutil

def move_old_files():
    """
    Moves files from directories named "*-old" to "old/*".
    Creates the "old" directory if it doesn't exist.
    Cleans up the "*-old" directories after moving the files.
    """
    
    target_dir = "old"
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
    
    for item in os.listdir("."):
        if item.endswith("-old") and os.path.isdir(item):
            new_dir_name = item[:-4]  # Remove "-old" suffix
            new_dir_path = os.path.join(target_dir, new_dir_name)
            
            # Create the new directory inside "old" if it doesn't exist
            if not os.path.exists(new_dir_path):
                os.makedirs(new_dir_path)
            
            # Move files from the old directory to the new directory
            for filename in os.listdir(item):
                old_file_path = os.path.join(item, filename)
                new_file_path = os.path.join(new_dir_path, filename)
                shutil.move(old_file_path, new_file_path)
            
            # Clean up the old directory
            if not os.listdir(item):
                os.rmdir(item)
                print(f"Removed empty directory: {item}")
            else:
                print(f"Directory {item} is not empty, skipping removal.")

if __name__ == "__main__":
    move_old_files()
