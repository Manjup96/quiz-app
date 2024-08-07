import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db, auth } from '../../../Components/Firebase/FirebaseConfig';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserPDF from './UserPDF';
import '../../../Styles/AdminUser.css';

const User = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Set the number of items per page

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'users'));
        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery) ||
      user.mobile.toLowerCase().includes(lowercasedQuery) ||
      (user.std && user.std.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchQuery, users]);

  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return (
      <Pagination className='user-pagination'>
        <Pagination.Prev
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Next
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  const handleDelete = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (!confirmation) {
      return; // User cancelled the deletion
    }

    try {
      await deleteDoc(doc(db, 'users', userId));

      const user = auth.currentUser;
      if (user && user.uid === userId) {
        await deleteUser(user);
      }

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setEditingUser(userToEdit);
    setUpdatedUser({
      name: userToEdit.name,
      email: userToEdit.email,
      mobile: userToEdit.mobile,
      password: '' // Password will be updated separately
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const userDocRef = doc(db, 'users', editingUser.id);

      // Update Firestore
      await updateDoc(userDocRef, {
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile
      });

      // Update Firebase Auth email
      if (auth.currentUser.email !== updatedUser.email) {
        await updateEmail(auth.currentUser, updatedUser.email);
      }

      // Update Firebase Auth password if provided
      if (updatedUser.password) {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, updatedUser.password);
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === editingUser.id
            ? { ...user, name: updatedUser.name, email: updatedUser.email, mobile: updatedUser.mobile }
            : user
        )
      );

      setSuccessMsg('User updated successfully.');
      setIsEditing(false);
      setCurrentPassword('');
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMsg('Failed to update the user. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="user-table-container">
        <h1 className='user-table-heading'>User Details</h1>
        <div className="export-button-container userexportmain">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="user-search-input"
          />
          <PDFDownloadLink
            document={<UserPDF users={filteredUsers} />}
            fileName="user_details.pdf"
            className="userexport"
          >
            Download PDF
          </PDFDownloadLink>

        </div>

        <div className='table-main'>
          <table className='user_table_main'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{user.std}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => handleUpdate(user.id)}
                      style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                    ></i>
                    <i
                      className="fa-solid fa-trash-alt"
                      onClick={() => handleDelete(user.id)}
                      style={{ cursor: 'pointer', color: 'red' }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderPagination()}

        <Modal show={isEditing} onHide={() => setIsEditing(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={updatedUser.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password (leave blank to keep current password)</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCurrentPassword">
                <Form.Label>Current Password (required to change email/password)</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            {successMsg && <p className="success-msg">{successMsg}</p>}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default User;
