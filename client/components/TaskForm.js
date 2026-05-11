// TaskForm Component
// Form for creating and editing tasks

import { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from './Button';
import toast from 'react-hot-toast';

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'MEDIUM',
    deadline: task?.deadline ? task.deadline.split('T')[0] : '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past';
    }
    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Prepare data for submission - convert empty deadline to null
      const submitData = {
        ...formData,
        deadline: formData.deadline || null,
      };
      await onSubmit(submitData);
      toast.success(task ? 'Task updated successfully!' : 'Task created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <Input
        label="Task Title"
        name="title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      {/* Description */}
      <Textarea
        label="Description (Optional)"
        name="description"
        placeholder="Enter task description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
      />

      {/* Priority */}
      <Select
        label="Priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        options={[
          { label: 'Low', value: 'LOW' },
          { label: 'Medium', value: 'MEDIUM' },
          { label: 'High', value: 'HIGH' },
        ]}
      />

      {/* Deadline */}
      <Input
        label="Deadline (Optional)"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
        error={errors.deadline}
      />

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
