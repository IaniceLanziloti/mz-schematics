interface I<%= classify(name) %>DeleteParamsDTO {
  <%=underscore(name)%>_id: string;
}

export { I<%= classify(name) %>DeleteParamsDTO };
