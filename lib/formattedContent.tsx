const formattedContent = (content: string) => {
  return content.replaceAll(`\n`, "").replace(/’|&/g, "");
};

export default formattedContent;
