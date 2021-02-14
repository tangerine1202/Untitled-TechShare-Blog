import fs from 'fs'
import path from 'path'
import parseNotionMd from '../../lib/parseNotionMd'

const baseUrl = path.join(process.cwd(), 'posts');

export function getPostIds() {
  const fileNames = fs.readdirSync(baseUrl, 'utf-8').filter(path => path.endsWith('.md'))
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md/, '')
      }
    }
  })
}

export function getPost(id) {
  const fileName = path.join(baseUrl, `${id}.md`);
  const data = fs.readFileSync(fileName, 'utf-8');
  return data;
}

export function getPostList() {
  const fileNames = fs.readdirSync(baseUrl, 'utf-8').filter(path => path.endsWith('.md'))
  const postList = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md/, '');
    const fullPath = path.join(baseUrl, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const propsObj = parseNotionMd(fileContent);

    return {
      id,
      content: fileContent,
      props: propsObj
    }
  })
  return {
    total: postList.length,
    data: postList
  }
}