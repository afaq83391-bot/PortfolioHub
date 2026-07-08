import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authApi } from '../api/authApi';
import { compressImage } from '../utils/helpers';

export default function Profile() {
  var auth = useAuth();
  var user = auth.user;
  var updateUser = auth.updateUser;
  var toast = useToast();
  var fileInputRef = useRef(null);

  var nameState = useState(user ? user.name : '');
  var name = nameState[0]; var setName = nameState[1];
  var bioState = useState(user ? user.bio || '' : '');
  var bio = bioState[0]; var setBio = bioState[1];
  var locationState = useState(user ? user.location || '' : '');
  var loc = locationState[0]; var setLoc = locationState[1];
  var websiteState = useState(user ? user.website || '' : '');
  var website = websiteState[0]; var setWebsite = websiteState[1];

  var currentPwState = useState('');
  var currentPw = currentPwState[0]; var setCurrentPw = currentPwState[1];
  var newPwState = useState('');
  var newPw = newPwState[0]; var setNewPw = newPwState[1];
  var confirmPwState = useState('');
  var confirmPw = confirmPwState[0]; var setConfirmPw = confirmPwState[1];

  var submittingState = useState(false);
  var submitting = submittingState[0]; var setSubmitting = submittingState[1];

  var pwStrengthState = useState(0);
  var pwStrength = pwStrengthState[0]; var setPwStrength = pwStrengthState[1];
  var pwLabelState = useState('');
  var pwLabel = pwLabelState[0]; var setPwLabel = pwLabelState[1];

  var avatarUrl = user && user.avatar ? user.avatar : 'https://ui-avatars.com/api/?name=' + encodeURIComponent((user && user.name) || 'U') + '&background=2563EB&color=fff&size=200&bold=true';

  var handleAvatarUpload = function (e) {
    var file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Avatar must be under 2MB'); return; }
    toast.info('Updating avatar...');
    compressImage(file, 200, 0.8).then(function (compressed) {
      var byteString = atob(compressed.split(',')[1]);
      var mimeString = compressed.split(',')[0].split(':')[1].split(';')[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      var blob = new Blob([ab], { type: mimeString });
      var formData = new FormData();
      formData.append('avatar', blob, 'avatar.jpg');
      return authApi.uploadAvatar(formData);
    }).then(function (res) {
      if (res && res.data && res.data.success) {
        var updated = Object.assign({}, user);
        updated.avatar = res.data.data.avatar;
        updateUser(updated);
        toast.success('Avatar updated');
      }
    }).catch(function () { toast.error('Failed to upload avatar'); });
  };

  var checkPwStrength = function (pw) {
    var score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
    setPwStrength(score);
    var labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    var colors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];
    setPwLabel(labels[score] || '');
    var bars = document.querySelectorAll('.pw-bar');
    bars.forEach(function (bar, idx) {
      if (bar) {
        bar.style.width = idx < score ? '100%' : '0%';
        bar.style.background = idx < score ? colors[score] : '#E2E8F0';
      }
    });
    var labelEl = document.getElementById('pw-label');
    if (labelEl) { labelEl.textContent = pw.length > 0 ? labels[score] || '' : ''; labelEl.style.color = colors[score] || '#94A3B8'; }
  };

  var handleSubmit = function (e) {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required'); return; }

    setSubmitting(true);
    var promises = [];

    // Update profile
    promises.push(
      authApi.updateProfile({ name: name.trim(), bio: bio, location: loc, website: website })
        .then(function (res) {
          if (res.data.success) updateUser(res.data.data);
        })
        .catch(function (err) { toast.error(err.message || 'Failed to update profile'); })
    );

    // Change password if filled
    if (currentPw || newPw || confirmPw) {
      if (!currentPw) { toast.error('Current password is required'); setSubmitting(false); return; }
      if (newPw.length < 6) { toast.error('New password must be at least 6 characters'); setSubmitting(false); return; }
      if (newPw !== confirmPw) { toast.error('New passwords do not match'); setSubmitting(false); return; }
      promises.push(
        authApi.changePassword({ currentPassword: currentPw, newPassword: newPw })
          .then(function () { toast.success('Password changed successfully'); setCurrentPw(''); setNewPw(''); setConfirmPw(''); setPwStrength(0); })
          .catch(function (err) { toast.error(err.message || 'Failed to change password'); })
      );
    }

    Promise.all(promises).finally(function () { setSubmitting(false); });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Profile</h2>
        <p className="text-slate-500 mt-1">Manage your account information</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-8 text-center">
          <div className="relative inline-block mb-4">
            <img id="profile-avatar-img" src={avatarUrl} alt={user ? user.name : ''} className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-50 shadow-lg" />
            <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-md" aria-label="Change avatar">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </label>
            <input id="avatar-upload" ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatarUpload} className="hidden" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">{user ? user.name : ''}</h2>
          <p className="text-slate-500 text-sm">{user ? user.email : ''}</p>
          <p className="text-slate-400 text-xs mt-1">Member since {user ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</p>
        </motion.div>

        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input type="text" value={name} onChange={function (e) { setName(e.target.value); }} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" value={user ? user.email : ''} className="input-field bg-slate-50" disabled />
                <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bio</label>
              <textarea value={bio} onChange={function (e) { setBio(e.target.value); }} rows={3} placeholder="Tell us about yourself..." className="input-field resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                <input type="text" value={loc} onChange={function (e) { setLoc(e.target.value); }} placeholder="Enter your location" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website</label>
                <input type="url" value={website} onChange={function (e) { setWebsite(e.target.value); }} placeholder="https://yoursite.com" className="input-field" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
              <input type="password" value={currentPw} onChange={function (e) { setCurrentPw(e.target.value); }} placeholder="Enter current password" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
              <input type="password" value={newPw} onChange={function (e) { setNewPw(e.target.value); checkPwStrength(e.target.value); }} placeholder="Enter new password" className="input-field" />
              <div className="mt-2 flex gap-1 bg-slate-100 rounded-full overflow-hidden h-1">
                <div className="pw-bar h-full rounded-full transition-all duration-300" style={{ width: '0%', background: '#E2E8F0' }} />
                <div className="pw-bar h-full rounded-full transition-all duration-300" style={{ width: '0%', background: '#E2E8F0' }} />
                <div className="pw-bar h-full rounded-full transition-all duration-300" style={{ width: '0%', background: '#E2E8F0' }} />
                <div className="pw-bar h-full rounded-full transition-all duration-300" style={{ width: '0%', background: '#E2E8F0' }} />
              </div>
              <p id="pw-label" className="text-xs mt-1" style={{ color: '#94A3B8' }}></p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
              <input type="password" value={confirmPw} onChange={function (e) { setConfirmPw(e.target.value); }} placeholder="Confirm new password" className="input-field" />
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          <button type="submit" disabled={submitting} className="btn-primary px-8">
            {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}