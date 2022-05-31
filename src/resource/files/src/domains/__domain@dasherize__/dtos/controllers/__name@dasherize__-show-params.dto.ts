interface I<%= classify(name) %>ShowParamsDTO {
  <%=underscore(name)%>_id: string;
}

export { I<%= classify(name) %>ShowParamsDTO };
