const validateSchema = (schema: any) => {
    if (!schema.formTitle || !schema.fields) {
      throw new Error("Schema must include 'formTitle' and 'fields'.");
    }
  
    schema.fields.forEach((field: any) => {
      if (!field.id || !field.type || !field.label) {
        throw new Error(`Each field must have 'id', 'type', and 'label'.`);
      }
    });
  };
  
  export default validateSchema;
  