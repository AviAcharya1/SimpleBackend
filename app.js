const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('Select an option:');
  console.log('1. Create a file');
  console.log('2. Read a file');
  console.log('3. Update a file');
  console.log('4. Delete a file');
  console.log('5. List files in directory');
  console.log('6. Exit');

  rl.question('Enter your choice: ', (choice) => {
    handleChoice(choice);
  });
}

function handleChoice(choice) {
  switch (choice) {
    case '1':
      createFile();
      break;
    case '2':
      readFile();
      break;
    case '3':
      updateFile();
      break;
    case '4':
      deleteFile();
      break;
    case '5':
      listFiles();
      break;
    case '6':
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      showMenu();
  }
}

function createFile() {
  rl.question('Enter the file name (with extension): ', (fileName) => {
    if (!isValidFileName(fileName)) {
      console.log('Invalid file name. Please try again.');
      createFile();
      return;
    }

    rl.question('Enter the file content: ', (content) => {
      const filePath = path.join(__dirname, fileName);
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.log(`Error creating file: ${err}`);
        } else {
          console.log(`File ${fileName} created successfully.`);
        }
        showMenu();
      });
    });
  });
}

function readFile() {
  rl.question('Enter the file name (with extension): ', (fileName) => {
    if (!isValidFileName(fileName)) {
      console.log('Invalid file name. Please try again.');
      readFile();
      return;
    }

    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file: ${err}`);
      } else {
        console.log(`File content: ${data}`);
      }
      showMenu();
    });
  });
}

function updateFile() {
  rl.question('Enter the file name (with extension): ', (fileName) => {
    if (!isValidFileName(fileName)) {
      console.log('Invalid file name. Please try again.');
      updateFile();
      return;
    }

    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file: ${err}`);
        showMenu();
        return;
      }

      console.log(`Current file content: ${data}`);
      rl.question('Enter the new content: ', (newContent) => {
        fs.writeFile(filePath, newContent, (err) => {
          if (err) {
            console.log(`Error updating file: ${err}`);
          } else {
            console.log(`File ${fileName} updated successfully.`);
          }
          showMenu();
        });
      });
    });
  });
}

function deleteFile() {
  rl.question('Enter the file name (with extension): ', (fileName) => {
    if (!isValidFileName(fileName)) {
      console.log('Invalid file name. Please try again.');
      deleteFile();
      return;
    }

    const filePath = path.join(__dirname, fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(`Error deleting file: ${err}`);
      } else {
        console.log(`File ${fileName} deleted successfully.`);
      }
      showMenu();
    });
  });
}

function listFiles() {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.log(`Error listing files: ${err}`);
    } else {
      console.log('Files in the current directory:');
      files.forEach((file) => {
        console.log(file);
      });
    }
    showMenu();
  });
}

function isValidFileName(fileName) {
  const validExtensions = ['.txt', '.js', '.json', '.md', '.csv'];
  const ext = path.extname(fileName).toLowerCase();
  return validExtensions.includes(ext);
}

showMenu();