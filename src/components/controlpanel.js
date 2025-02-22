import React from 'react';
import Select from 'react-select';

// styling the variables //
const labelStyle = { 
    fontWeight: 'bold', 
    marginRight: '4px', 
    marginLeft: '4px' 
};

// styling the container //
const containerStyle = {
    border: '2px solid #c3cfe2',
    borderRadius: '6px',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    position: 'relative', 
    zIndex: 10,
};
// dropdown for x,y, color, opacity, size  with options from dropdown//
const Dropdown = ({ label, options, onChange, placeholder }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={labelStyle}>{label}:</span>
        <Select
            options={options}
            onChange={(opt) => onChange(opt.value)}
            placeholder={placeholder}
            styles=
            {{
                container: (base) => ({ ...base, width: 190 }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }), 
                menu: (base) => ({ ...base, zIndex: 9999 }), 
            }}
            menuPortalTarget={document.body} 
        />
    </div>
);

// control panel for the dropdowns//
const ControlPanel = ({ 
    xAtt, yAtt, colorAtt, opacityAtt, sizeAtt,
    setXAttr, setYAttr, setColorAttr, setOpacityAttr, setSizeAttr
}) => {
    return (
        <div style={containerStyle}>
            {Dropdown({ label: "X", options: xAtt, onChange: setXAttr, placeholder: "x position" })}
            {Dropdown({ label: "Y", options: yAtt, onChange: setYAttr, placeholder: "y position" })}
            {Dropdown({ label: "Color", options: colorAtt, onChange: setColorAttr, placeholder: "color" })}
            {Dropdown({ label: "Opacity", options: opacityAtt, onChange: setOpacityAttr, placeholder: "opacity" })}
            {Dropdown({ label: "Size", options: sizeAtt, onChange: setSizeAttr, placeholder: "size" })}
        </div>
    );
};

export default ControlPanel;