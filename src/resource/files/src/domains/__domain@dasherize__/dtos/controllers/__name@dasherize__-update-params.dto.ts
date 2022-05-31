interface I<%= classify(name) %>UpdateParamsDTO {
  <%=underscore(name)%>_id: string;
}

export { I<%= classify(name) %>UpdateParamsDTO };
