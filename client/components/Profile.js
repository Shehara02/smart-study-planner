import React, { useState, useEffect, useRef } from 'react';
import { profileAPI } from '../services/api';
import { User, Mail, FileText, Target, Upload, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profilePicture: null,
    bio: '',
    studyGoals: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    studyGoals: ''
  });
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getProfile();
      const data = response.data.data;
      setProfileData(data);
      setFormData({
        name: data.name,
        bio: data.bio || '',
        studyGoals: data.studyGoals || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Name cannot be empty');
        return;
      }

      setSaving(true);
      const response = await profileAPI.updateProfile({
        name: formData.name,
        bio: formData.bio,
        studyGoals: formData.studyGoals
      });

      setProfileData(response.data.data);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      const form = new FormData();
      form.append('profilePicture', file);

      // For now, we'll create a local preview URL
      // In production, send to server for storage
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const response = await profileAPI.uploadProfilePicture(form);
          setProfileData(response.data.data);
          toast.success('Profile picture updated!');
        } catch (error) {
          console.error('Failed to upload picture:', error);
          toast.error('Failed to upload profile picture');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Profile picture upload error:', error);
      toast.error('Failed to upload profile picture');
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white shadow-lg">
        <div className="flex items-end space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <div
              onClick={handleProfilePictureClick}
              className="relative w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg cursor-pointer group border-4 border-white"
            >
              {profileData.profilePicture ? (
                <img
                  src={profileData.profilePicture}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </div>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
              disabled={uploading}
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-bold">{profileData.name}</h1>
            <p className="text-blue-100 mt-2 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{profileData.email}</span>
            </p>
            <p className="text-blue-100 mt-1 text-sm">
              Member since {new Date(profileData.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Edit Button */}
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bio Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bio</h2>
          </div>

          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap min-h-32">
              {profileData.bio || (
                <span className="italic text-gray-400">No bio added yet</span>
              )}
            </p>
          )}
        </div>

        {/* Study Goals Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Goals</h2>
          </div>

          {editing ? (
            <textarea
              name="studyGoals"
              value={formData.studyGoals}
              onChange={handleInputChange}
              placeholder="What are your study goals..."
              className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap min-h-32">
              {profileData.studyGoals || (
                <span className="italic text-gray-400">No study goals added yet</span>
              )}
            </p>
          )}
        </div>

        {/* Basic Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
          </div>

          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 py-2">{profileData.name}</p>
              )}
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <p className="text-gray-600 dark:text-gray-300 py-2">{profileData.email}</p>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Member Since
              </label>
              <p className="text-gray-600 dark:text-gray-300 py-2">
                {new Date(profileData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {editing && (
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={() => {
              setEditing(false);
              setFormData({
                name: profileData.name,
                bio: profileData.bio || '',
                studyGoals: profileData.studyGoals || ''
              });
            }}
            className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📈 Profile Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Profile Completion</p>
            <p className="text-3xl font-bold text-green-600">
              {(() => {
                let completion = 50; // name + email
                if (profileData.bio) completion += 20;
                if (profileData.studyGoals) completion += 20;
                if (profileData.profilePicture) completion += 10;
                return completion + '%';
              })()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Account Age</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.floor((new Date() - new Date(profileData.createdAt)) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Last Updated</p>
            <p className="text-sm font-semibold text-purple-600">
              {new Date(profileData.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
