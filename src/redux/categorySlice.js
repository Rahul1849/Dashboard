import { createSlice } from '@reduxjs/toolkit';

// Initial state containing categories and their associated widgets
const initialState = {
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Widget 1', text: 'This is widget 1' },
        { id: 2, name: 'Widget 2', text: 'This is widget 2' },
      ],
    },
  ],
};

// Created a slice for categories with actions to add and remove widgets
const categorySlice = createSlice({
  name: 'category',  // Name of the slice
  initialState,      // Initial state defined above
  reducers: {
    // Action to add a new widget to a specific category
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      // Find the category by its ID
      const category = state.categories.find(cat => cat.id === categoryId);
      // If the category exists, add the new widget to its widgets array
      if (category) {
        category.widgets.push(widget);
      }
    },
    // Action to remove a widget from a specific category
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      // Find the category by its ID
      const category = state.categories.find(cat => cat.id === categoryId);
      // If the category exists, filter out the widget by its ID
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
  },
});

// Export the actions for use in components
export const { addWidget, removeWidget } = categorySlice.actions;

// Export the reducer to be included in the store
export default categorySlice.reducer;
