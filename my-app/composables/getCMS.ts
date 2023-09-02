export const getCMS = async (contentPath) => {
  let key_name = contentPath.replaceAll('/','_') + "-data";
  let { data } = await useAsyncData(key_name, () => {
    return queryContent()
      .where({ _file: contentPath + ".yml" })
      .findOne();
  });
  return data;
}
