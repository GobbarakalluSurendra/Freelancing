import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogOut, Plus, Trash2, Star, Briefcase, MessageSquare, Award, Wrench } from 'lucide-react';

const CATEGORIES = ['Full Stack', 'Frontend', 'Backend', 'Design', 'Other'];

const StarPicker = ({ value, onChange }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className={`text-2xl transition-colors ${star <= value ? 'text-amber-400' : 'text-slate-600 hover:text-amber-300'}`}
      >
        ★
      </button>
    ))}
  </div>
);

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className={`glass-card p-6 flex items-center space-x-4 border-l-4 ${color}`}
  >
    <div className="p-3 bg-dark-900 rounded-xl">{icon}</div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects');

  // Projects State
  const [projects, setProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', techStack: '', liveLink: '', githubLink: '', category: 'Full Stack',
  });
  const [imageFile, setImageFile] = useState(null);

  // Messages State
  const [messages, setMessages] = useState([]);

  // Testimonials State
  const [testimonials, setTestimonials] = useState([]);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: '', company: '', message: '', rating: 5,
  });

  // Services State
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    title: '', description: '', icon: 'Monitor', price: '',
  });

  // Setup Axios interceptor to include token
  useEffect(() => {
    if (admin) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${admin.token}`;
    }
  }, [admin]);

  useEffect(() => {
    fetchProjects();
    fetchMessages();
    fetchTestimonials();
    fetchServices();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('/api/contact');
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get('/api/testimonials');
      setTestimonials(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('description', projectForm.description);
    formData.append('category', projectForm.category);
    const techArray = projectForm.techStack.split(',').map((item) => item.trim());
    formData.append('techStack', JSON.stringify(techArray));
    formData.append('liveLink', projectForm.liveLink);
    formData.append('githubLink', projectForm.githubLink);
    if (imageFile) formData.append('image', imageFile);

    try {
      await axios.post('/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShowAddProject(false);
      setProjectForm({ title: '', description: '', techStack: '', liveLink: '', githubLink: '', category: 'Full Stack' });
      setImageFile(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/testimonials', testimonialForm);
      setShowAddTestimonial(false);
      setTestimonialForm({ name: '', role: '', company: '', message: '', rating: 5 });
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      alert('Error saving testimonial');
    }
  };

  const deleteTestimonial = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await axios.delete(`/api/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchServices = async () => {
    try {
      const { data } = await axios.get('/api/services');
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/services', serviceForm);
      setShowAddService(false);
      setServiceForm({ title: '', description: '', icon: 'Monitor', price: '' });
      fetchServices();
    } catch (error) {
      console.error(error);
      alert('Error saving service');
    }
  };

  const deleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const tabs = [
    { key: 'projects', label: 'Manage Projects' },
    { key: 'services', label: 'Manage Services' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'messages', label: 'Contact Messages' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={logout} className="flex items-center text-slate-400 hover:text-white transition-colors">
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<Briefcase className="h-6 w-6 text-primary-400" />}
            label="Total Projects"
            value={projects.length}
            color="border-primary-500"
          />
          <StatCard
            icon={<Wrench className="h-6 w-6 text-emerald-400" />}
            label="Total Services"
            value={services.length}
            color="border-emerald-500"
          />
          <StatCard
            icon={<MessageSquare className="h-6 w-6 text-blue-400" />}
            label="Contact Messages"
            value={messages.length}
            color="border-blue-500"
          />
          <StatCard
            icon={<Award className="h-6 w-6 text-amber-400" />}
            label="Testimonials"
            value={testimonials.length}
            color="border-amber-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              id={`admin-tab-${tab.key}`}
              className={`pb-4 px-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Projects Tab ─── */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Your Projects</h2>
              <button
                id="add-project-btn"
                onClick={() => setShowAddProject(!showAddProject)}
                className="btn-primary text-sm px-4 py-2 flex items-center"
              >
                {showAddProject ? 'Cancel' : <><Plus className="h-4 w-4 mr-1" /> Add Project</>}
              </button>
            </div>

            {showAddProject && (
              <div className="glass-card p-6 mb-8">
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Title</label>
                      <input required type="text" className="input-field" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Category</label>
                      <select
                        className="input-field"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Tech Stack (comma separated)</label>
                      <input required type="text" className="input-field" value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} placeholder="React, Node, MongoDB" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-300 mb-1">Description</label>
                      <textarea required className="input-field h-24 resize-none" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Live Link</label>
                      <input type="text" className="input-field" value={projectForm.liveLink} onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">GitHub Link</label>
                      <input type="text" className="input-field" value={projectForm.githubLink} onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-300 mb-1">Project Image</label>
                      <input required type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="text-slate-300" />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full">Save Project</button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="glass-card overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                        {project.category && (
                          <span className="text-xs text-primary-400 font-medium">{project.category}</span>
                        )}
                      </div>
                      <button onClick={() => deleteProject(project._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-slate-400 col-span-full">No projects found. Add one above.</p>}
            </div>
          </div>
        )}

        {/* ─── Services Tab ─── */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Your Services</h2>
              <button
                id="add-service-btn"
                onClick={() => setShowAddService(!showAddService)}
                className="btn-primary text-sm px-4 py-2 flex items-center"
              >
                {showAddService ? 'Cancel' : <><Plus className="h-4 w-4 mr-1" /> Add Service</>}
              </button>
            </div>

            {showAddService && (
              <div className="glass-card p-6 mb-8">
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Title</label>
                      <input required type="text" className="input-field" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="e.g. Frontend Development" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Price Info</label>
                      <input required type="text" className="input-field" value={serviceForm.price} onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })} placeholder="e.g. Starting at $500" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Icon</label>
                      <select
                        className="input-field"
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                      >
                        <option value="Monitor">Monitor (Frontend)</option>
                        <option value="Server">Server (Backend)</option>
                        <option value="Database">Database (DB Design)</option>
                        <option value="Smartphone">Smartphone (Mobile/Fullstack)</option>
                        <option value="PenTool">PenTool (UI/UX Design)</option>
                        <option value="Search">Search (SEO)</option>
                        <option value="Code">Code (General Dev)</option>
                        <option value="Globe">Globe (Websites)</option>
                        <option value="Layers">Layers (Full Stack)</option>
                        <option value="Cpu">Cpu (Optimizations)</option>
                        <option value="Settings">Settings (Config)</option>
                        <option value="Shield">Shield (Security)</option>
                        <option value="Cloud">Cloud (Deployment)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-300 mb-1">Description</label>
                      <textarea required className="input-field h-24 resize-none" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Describe the service details..."></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full">Save Service</button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service._id} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-primary-400 font-semibold uppercase px-2.5 py-0.5 bg-primary-500/10 rounded-full border border-primary-500/20">
                          {service.icon}
                        </span>
                      </div>
                      <button onClick={() => deleteService(service._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">{service.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <span className="text-sm font-semibold text-emerald-400">{service.price}</span>
                  </div>
                </div>
              ))}
              {services.length === 0 && <p className="text-slate-400 col-span-full">No services found. Add one above.</p>}
            </div>
          </div>
        )}

        {/* ─── Testimonials Tab ─── */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Client Testimonials</h2>
              <button
                id="add-testimonial-btn"
                onClick={() => setShowAddTestimonial(!showAddTestimonial)}
                className="btn-primary text-sm px-4 py-2 flex items-center"
              >
                {showAddTestimonial ? 'Cancel' : <><Plus className="h-4 w-4 mr-1" /> Add Testimonial</>}
              </button>
            </div>

            {showAddTestimonial && (
              <div className="glass-card p-6 mb-8">
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Client Name</label>
                      <input required type="text" className="input-field" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Role / Title</label>
                      <input required type="text" className="input-field" value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="CEO" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Company (optional)</label>
                      <input type="text" className="input-field" value={testimonialForm.company} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} placeholder="Acme Inc." />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Rating</label>
                      <StarPicker value={testimonialForm.rating} onChange={(val) => setTestimonialForm({ ...testimonialForm, rating: val })} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-300 mb-1">Review Message</label>
                      <textarea required className="input-field h-28 resize-none" value={testimonialForm.message} onChange={(e) => setTestimonialForm({ ...testimonialForm, message: e.target.value })} placeholder="What did the client say?" />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full">Save Testimonial</button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t._id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {t.avatarInitials || t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{t.name}</p>
                        <p className="text-slate-400 text-sm">{t.role}{t.company ? ` @ ${t.company}` : ''}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteTestimonial(t._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded flex-shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex space-x-1 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`h-4 w-4 ${s <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic">"{t.message}"</p>
                </div>
              ))}
              {testimonials.length === 0 && <p className="text-slate-400 col-span-full">No testimonials yet. Add your first one above.</p>}
            </div>
          </div>
        )}

        {/* ─── Messages Tab ─── */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Contact Messages</h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg._id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-primary-500 text-sm hover:underline">{msg.email}</a>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-300 bg-dark-900 p-4 rounded-lg">{msg.message}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-slate-400">No messages found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
