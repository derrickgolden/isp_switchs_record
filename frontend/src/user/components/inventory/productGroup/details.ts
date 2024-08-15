export const customCardStyle: Record<string, { border: string; text: string; bg: string }> = {
    active: { border: "border-success-subtle", text: "text-success", bg: "bg-success-subtle" },
    unconnected: { border: "border-warning-subtle", text: "text-warning", bg: "bg-warning-subtle" },
    inactive: { border: "border-info-subtle", text: "text-info", bg: "bg-info-subtle" },
    faulty: { border: "border-danger-subtle", text: "text-danger", bg: "bg-danger-subtle" },
  };
  
export const options = [
    { id: 'unconnected', value: 'unconnected', label: 'Unconnected' },
    { id: 'active', value: 'active', label: 'Active' },
    { id: 'inactive', value: 'inactive', label: 'Inactive' },
    { id: 'faulty', value: 'faulty', label: 'Faulty' },
  ];

export const filterBtn = [
  {text: "all", css: "btn-primary"}, 
  {text: "active", css: "btn-info"}, 
  {text: "inactive", css: "btn-success"}, 
  {text: "unconnected", css: "btn-warning"}, 
  {text: "faulty", css: "btn-danger"}
];