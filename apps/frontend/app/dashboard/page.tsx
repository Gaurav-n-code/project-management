'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const router = useRouter();

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3002/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await res.json();

    // ✅ Newest first
    data = data.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    setProjects(data);
  };

  const createProject = async () => {
    const token = localStorage.getItem('token');

    if (!name.trim()) {
      alert('Project name required');
      return;
    }

    await fetch('http://localhost:3002/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    setName('');
    setDescription('');
    fetchProjects();
  };

  const updateProject = async (id: string) => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:3002/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    setEditingId(null);
    setName('');
    setDescription('');
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    const token = localStorage.getItem('token');

    if (!confirm('Delete this project?')) return;

    await fetch(`http://localhost:3002/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProjects();
  };

  const startEdit = (project: any) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Projects
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your projects
          </p>
        </div>

        {/* Create / Edit */}
        <div className="bg-white p-5 rounded-xl border mb-8 shadow-sm">
          <h3 className="font-medium mb-4">
            {editingId ? 'Edit Project' : 'Create Project'}
          </h3>

          <div className="flex gap-3 flex-col md:flex-row">
            <input
              className="flex-1 border px-3 py-2 rounded-lg"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="flex-1 border px-3 py-2 rounded-lg"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {editingId ? (
              <button
                onClick={() => updateProject(editingId)}
                className="bg-green-600 text-white px-4 rounded-lg"
              >
                Update
              </button>
            ) : (
              <button
                onClick={createProject}
                className="bg-indigo-600 text-white px-4 rounded-lg"
              >
                Create
              </button>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div
              key={project.id}
              className="bg-white p-5 rounded-xl border hover:shadow-md transition"
            >
              <h2
                onClick={() => router.push(`/project/${project.id}`)}
                className="text-lg font-semibold cursor-pointer text-gray-900"
              >
                {project.name}
              </h2>

              <p className="text-gray-600 text-sm mt-2">
                {project.description}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => startEdit(project)}
                  className="text-sm text-indigo-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}