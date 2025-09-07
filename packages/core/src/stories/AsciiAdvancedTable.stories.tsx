import type { Meta, StoryObj } from '@storybook/react';
import { AsciiAdvancedTable, AsciiTableColumn } from '../components/AsciiAdvancedTable';

// Sample data
const employees = [
  { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000, active: true, hireDate: '2022-01-15' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000, active: true, hireDate: '2021-08-22' },
  { id: 3, name: 'Bob Wilson', department: 'Engineering', salary: 85000, active: false, hireDate: '2020-03-10' },
  { id: 4, name: 'Alice Brown', department: 'Design', salary: 70000, active: true, hireDate: '2023-02-28' },
  { id: 5, name: 'Charlie Davis', department: 'Sales', salary: 55000, active: true, hireDate: '2022-11-05' },
  { id: 6, name: 'Diana Evans', department: 'Engineering', salary: 90000, active: true, hireDate: '2019-12-01' },
  { id: 7, name: 'Frank Miller', department: 'Marketing', salary: 60000, active: false, hireDate: '2021-05-18' },
  { id: 8, name: 'Grace Lee', department: 'HR', salary: 62000, active: true, hireDate: '2020-09-14' },
  { id: 9, name: 'Henry Taylor', department: 'Sales', salary: 58000, active: true, hireDate: '2022-07-03' },
  { id: 10, name: 'Ivy Chen', department: 'Design', salary: 72000, active: true, hireDate: '2021-11-20' },
  { id: 11, name: 'Jack Anderson', department: 'Engineering', salary: 88000, active: true, hireDate: '2020-04-12' },
  { id: 12, name: 'Karen White', department: 'Finance', salary: 68000, active: false, hireDate: '2019-08-30' },
  { id: 13, name: 'Leo Garcia', department: 'Marketing', salary: 63000, active: true, hireDate: '2023-01-08' },
  { id: 14, name: 'Maya Patel', department: 'Engineering', salary: 92000, active: true, hireDate: '2018-06-25' },
  { id: 15, name: 'Noah Johnson', department: 'Sales', salary: 59000, active: true, hireDate: '2022-03-17' },
];

const columns: AsciiTableColumn[] = [
  { 
    key: 'id', 
    header: 'ID', 
    width: '8%',
    align: 'center',
    sortable: true 
  },
  { 
    key: 'name', 
    header: 'Name', 
    width: '20%',
    sortable: true,
    filterable: true 
  },
  { 
    key: 'department', 
    header: 'Department', 
    width: '18%',
    sortable: true,
    filterable: true 
  },
  { 
    key: 'salary', 
    header: 'Salary', 
    width: '15%',
    align: 'right',
    sortable: true,
    render: (value) => `$${value.toLocaleString()}`
  },
  { 
    key: 'active', 
    header: 'Status', 
    width: '12%',
    align: 'center',
    sortable: true,
    render: (value) => value ? '🟢 Active' : '🔴 Inactive'
  },
  { 
    key: 'hireDate', 
    header: 'Hire Date', 
    width: '15%',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString()
  },
  {
    key: 'actions',
    header: 'Actions',
    width: '12%',
    align: 'center',
    sortable: false,
    filterable: false,
    render: (_, row) => (
      <span className="flex gap-1 justify-center">
        <button className="hover:opacity-70">✏️</button>
        <button className="hover:opacity-70">🗑️</button>
      </span>
    )
  }
];

const meta: Meta<typeof AsciiAdvancedTable> = {
  title: 'Components/AsciiAdvancedTable',
  component: AsciiAdvancedTable,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' }
  },
  argTypes: {
    sortable: {
      control: 'boolean',
      description: 'Enable sorting for all columns'
    },
    filterable: {
      control: 'boolean', 
      description: 'Enable filtering for all columns'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable global search'
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination'
    },
    pageSize: {
      control: { type: 'range', min: 5, max: 50 },
      description: 'Number of rows per page'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
  },
};

export default meta;
type Story = StoryObj<typeof AsciiAdvancedTable>;

export const FullFeatures: Story = {
  args: {
    columns,
    data: employees,
    caption: 'Employee Management System',
    sortable: true,
    filterable: true,
    searchable: true,
    paginated: true,
    pageSize: 8,
    loading: false,
    onRowClick: (row, index) => {
      alert(`Clicked on ${row.name} (ID: ${row.id})`);
    },
  },
};

export const SimpleTable: Story = {
  args: {
    columns: columns.slice(0, 4), // Only first 4 columns
    data: employees.slice(0, 8),
    sortable: true,
    filterable: false,
    searchable: false,
    paginated: false,
  },
};

export const SortableOnly: Story = {
  args: {
    columns,
    data: employees,
    caption: 'Sortable Employee List',
    sortable: true,
    filterable: false,
    searchable: false,
    paginated: false,
  },
};

export const FilterableOnly: Story = {
  args: {
    columns,
    data: employees,
    caption: 'Filterable Employee List',
    sortable: false,
    filterable: true,
    searchable: true,
    paginated: false,
  },
};

export const PaginatedOnly: Story = {
  args: {
    columns,
    data: employees,
    caption: 'Paginated Employee List',
    sortable: false,
    filterable: false,
    searchable: false,
    paginated: true,
    pageSize: 5,
  },
};

export const LoadingState: Story = {
  args: {
    columns,
    data: employees,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No employees found',
    sortable: true,
    filterable: true,
    searchable: true,
  },
};

export const SmallDataSet: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Product', width: '40%', sortable: true },
      { key: 'price', header: 'Price', width: '30%', align: 'right', sortable: true, render: (value) => `$${value}` },
      { key: 'stock', header: 'Stock', width: '30%', align: 'center', sortable: true },
    ],
    data: [
      { name: 'Laptop', price: 999, stock: 25 },
      { name: 'Mouse', price: 29, stock: 150 },
      { name: 'Keyboard', price: 79, stock: 80 },
      { name: 'Monitor', price: 299, stock: 12 },
    ],
    caption: 'Product Inventory',
    paginated: false,
  },
};

export const CustomRendering: Story = {
  args: {
    columns: [
      { key: 'name', header: 'User', width: '25%' },
      { 
        key: 'progress', 
        header: 'Progress', 
        width: '30%',
        render: (value) => {
          const bars = '█'.repeat(Math.floor(value / 10));
          const empty = '░'.repeat(10 - Math.floor(value / 10));
          return `${bars}${empty} ${value}%`;
        }
      },
      { 
        key: 'status', 
        header: 'Status', 
        width: '20%', 
        align: 'center',
        render: (value) => {
          const colors = {
            'active': '🟢',
            'pending': '🟡', 
            'inactive': '🔴'
          };
          return `${colors[value]} ${value}`;
        }
      },
      { 
        key: 'lastSeen', 
        header: 'Last Seen', 
        width: '25%',
        render: (value) => {
          const date = new Date(value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
      },
    ],
    data: [
      { name: 'Alex', progress: 85, status: 'active', lastSeen: '2024-01-15T10:30:00' },
      { name: 'Beth', progress: 45, status: 'pending', lastSeen: '2024-01-14T15:20:00' },
      { name: 'Carl', progress: 100, status: 'active', lastSeen: '2024-01-15T09:45:00' },
      { name: 'Dana', progress: 20, status: 'inactive', lastSeen: '2024-01-10T14:10:00' },
    ],
    caption: 'User Activity Dashboard',
    sortable: true,
    paginated: false,
  },
};