import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../redux/categorySlice';

function Category({ category }) {
  const dispatch = useDispatch();
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAddWidget = () => {
    const newWidget = {
      id: Date.now(),
      name: widgetName,
      text: widgetText
    };
    dispatch(addWidget({ categoryId: category.id, widget: newWidget }));
    setWidgetName('');
    setWidgetText('');
  };

  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="widgets">
        {category.widgets.map(widget => (
          <div key={widget.id} className="widget">
            <h3>{widget.name}</h3>
            <p>{widget.text}</p>
            <button onClick={() => dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))}>Remove</button>
          </div>
        ))}
      </div>
      <div className="add-widget">
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={e => setWidgetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={widgetText}
          onChange={e => setWidgetText(e.target.value)}
        />
        <button onClick={handleAddWidget}>Add Widget</button>
      </div>
    </div>
  );
}

export default Category;
