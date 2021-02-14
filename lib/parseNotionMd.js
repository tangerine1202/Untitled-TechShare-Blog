export default function parseNotionMd(content) {
  const [title, allPropsStr] = content.split('\n\n', 3);
  const propsStrList = allPropsStr.split('\n');

  const propsObj = { title };
  for (const propsStr of propsStrList) {
    const [key, value] = propsStr.split(':', 2).map((str) => str.trim());
    propsObj[key] = value;
  }

  return propsObj;
}