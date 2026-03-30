'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProjectPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:3002/projects/${id}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:3002/projects/${id}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle('');
    fetchTasks();
  };

  const updateStatus = async (taskId: string, status: string) => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:3002/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchTasks();
  };

  const statusStyle = (status: string) => {
    if (status === 'todo') return 'bg-gray-100 text-gray-700';
    if (status === 'in-progress') return 'bg-yellow-100 text-yellow-700';
    if (status === 'done') return 'bg-green-100 text-green-700';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Tasks
        </h1>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createTask}
            className="bg-indigo-600 text-white px-5 rounded-lg hover:bg-indigo-500"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((task: any) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  {task.title}
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-2 mt-4">
                {['todo', 'in-progress', 'done'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(task.id, s)}
                    className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}