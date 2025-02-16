### TODOs

Data table
- Multiple row templates - expandable
- Add table tests

Forms
- Three concepts
  - Type (strongly defined based on view model)
  - Form instance
  - Schema for dynamic design

AutoFocus directive
- Tests

### Generic form

- It should only take care of drawing the form
- Creation is a separate step outside the generic form
- We could provide a semi-automatic creation of a form based on a model
- Lookup values must be provided to the form, refresh should notify form's host
- Form communicates actions (save/delete/cancel) with form data

Next steps
- Select support (lookups, refresh)
- Date picker, Luxon support
