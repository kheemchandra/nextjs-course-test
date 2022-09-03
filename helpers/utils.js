const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POST_DIRECTORIES = path.join(process.cwd(), 'posts');

export function getFileList(){
  const filesList = fs.readdirSync(POST_DIRECTORIES);
  return filesList;
}

export function getFileData(fname){
  let fileName = fname.replace(/\.md$/, '');
  fileName = fileName + '.md';
  const filePath = path.join(POST_DIRECTORIES, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent); 
  return {content, ...data};
}

export function getAllFiles() {
  const files = getFileList();
  const filesData = files.map(file => {
    const filePath = path.join(POST_DIRECTORIES, file);
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const {data} = matter(fileData);
    return {
      ...data,
      slug: file.replace(/\.md$/, '')
    } 
  });  
  return filesData.sort((postA, postB) => new Date(postA.date) > new Date(postB.date) ? -1: 1);
}

export function getFeaturedFiles(){
  const filesData = getAllFiles();
  return filesData.filter(fileData => fileData.isFeatured);
}
