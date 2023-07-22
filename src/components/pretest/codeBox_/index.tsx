// // /* eslint-disable @typescript-eslint/no-unused-vars */
// // /* eslint-disable prefer-const */
// // /* eslint-disable no-console */
// // // import Quill from 'quill';
// // import { useInput } from 'components/common/hooks/useInput';
// // import QuillCursors from 'quill-cursors';
// // import { useEffect, useRef, useState } from 'react';
// // import { Quill } from 'react-quill';
// // import { styled } from 'styled-components';
// // import { QuillBinding } from 'y-quill';
// // import { WebrtcProvider } from 'y-webrtc';
// // import * as Y from 'yjs';
// // // Each user should be associated to a color.
// // // One approach is to pick a random color from a pool of colors that work well with your project.
// // export const usercolors = [
// //   '#30bced',
// //   '#6eeb83',
// //   '#ffbc42',
// //   '#ecd444',
// //   '#ee6352',
// //   '#9ac2c9',
// //   '#8acb88',
// //   '#1be7ff',
// // ];
// // Quill.register('modules/cursors', QuillCursors);
// // let quill = null;
// // let binding = null;
// // const ydoc = new Y.Doc();
// // const documentList = ydoc.getArray('doc-list');
// // console.log('documentList', documentList);
// // const provider = new WebrtcProvider('already-list-room', ydoc);
// // function Quil() {
// //   const docsRef = useRef();
// //   const editorRef = useRef();
// //   const usersRef = useRef();
// //   const [username, onChangeUsername, setUsername] = useInput('');
// //   const [currentDocs, setDocs] = useState([]);
// //   // We don't want to render an editor before a document is selected. So we set this to null for now..
// //   // A Yjs document holds the shared data
// //   const { awareness } = provider;
// //   // Bind editor to a new ytext type
// //   const bindEditor = (ytext) => {
// //     if (binding) {
// //       // We can reuse the existing editor. But we need to remove all event handlers
// //       // that we registered for collaborative editing before binding to a new editor binding
// //       binding.destroy();
// //     }
// //     if (quill === null) {
// //       // This is the first time a user opens a document.
// //       // The editor has not been initialized yet.
// //       // Create an editor instance.
// //       quill = new Quill(editorRef.current, {
// //         modules: {
// //           cursors: true,
// //           toolbar: [
// //             // adding some basic Quill content features
// //             [{ header: [1, 2, false] }],
// //             ['bold', 'italic', 'underline'],
// //             ['image', 'code-block'],
// //           ],
// //           history: {
// //             // Local undo shouldn't undo changes
// //             // from remote users
// //             userOnly: true,
// //           },
// //         },
// //         placeholder: 'Start collaborating...',
// //         theme: 'snow', // 'bubble' is also great
// //       });
// //     }
// //     // "Bind" the quill editor to a Yjs text type.
// //     // The QuillBinding uses the awareness instance to propagate your cursor location.
// //     binding = new QuillBinding(ytext, quill, awareness);
// //   };
// //   const renderDocs = () => {
// //     // render documents to an HTML string (e.g. '<input type button index="0" value="Document 0" /><input ...')
// //     const docs = documentList
// //       .toArray()
// //       .map(
// //         // (ytext, i) => `<input type="button" index=${i} value="Document ${i}" />`
// //         (ytext, i) => `<input type="button"  value="Document ${i}" />`,
// //       )
// //       .join('');
// //     // insert the list of all docs. But the first one is a "create new document" button
// //     // docsRef.current =
// //     console.log(docsRef.current);
// //     //  `<input type="button" index="new" value="+ Create New Document" /><input type="button" index="clear" value="- Delete All" />${docs}`;
// //     if (documentList.length === 0) {
// //       // A user deleted all documents. Clear the editor content & binding.
// //       if (binding) {
// //         binding.destroy();
// //       }
// //       if (quill) {
// //         quill.setContents('');
// //       }
// //     }
// //   };

// //   //   const renderDocs = () => {
// //   //     // render documents to an HTML string (e.g. '<input type button index="0" value="Document 0" /><input ...')
// //   //     const docs = documentList
// //   //       .toArray()
// //   //       .map(
// //   //         (ytext, i) =>
// //   //           `<input type="button" index=${i} value="Document ${i}" />`,
// //   //       )
// //   //       .join('');
// //   //     // insert the list of all docs. But the first one is a "create new document" button
// //   //     // docsDiv.innerHTML = `<input type="button" index="new" value="+ Create New Document" /><input type="button" index="clear" value="- Delete All" />${docs}`;
// //   //     if (documentList.length === 0) {
// //   //       // A user deleted all documents. Clear the editor content & binding.
// //   //       if (binding) {
// //   //         binding.destroy();
// //   //       }
// //   //       if (quill) {
// //   //         quill.setContents('');
// //   //       }
// //   //     }
// //   //   };
// //   // }, []);
// //   // // every time a document is added, we rerender the list of documents.
// //   // documentList.observe(renderDocs);

// //   const myColor = usercolors[Math.floor(Math.random() * usercolors.length)];

// //   // // propagate the username from the input element to all users

// //   useEffect(() => {
// //     awareness.setLocalStateField('user', {
// //       name: username,
// //       color: myColor,
// //     });
// //   }, [awareness, myColor, username]);

// //   // // observe changes on the input element that contains the username

// //   // // Render a list of usernames next to the editor whenever new information is available from the awareness instance
// //   awareness.on('change', () => {
// //     // Map each awareness state to a dom-string
// //     const strings = [];
// //     awareness.getStates().forEach((state) => {
// //       console.log(state);
// //       if (state.user) {
// //         strings.push(
// //           `<div style="color:${state.user.color};">• ${state.user.name}</div>`,
// //         );
// //       }
// //       // document.querySelector('#users').innerHTML = strings.join('');
// //       usersRef.current = strings.join('');
// //     });
// //   });

// //   // // Set a randomly generated username - this is nice for testing
// //   // // inputElement?.value =
// //   // DoUsername.generate(15);
// //   // setUserName(DoUsername.generate(15));

// //   const onCreateNewDocument = () => {
// //     // create a new document
// //     const newDoc = new Y.Text();
// //     // Set initial content with the headline being the index of the documentList
// //     newDoc.applyDelta([
// //       { insert: `Document #${documentList.length}` },
// //       { insert: '\n', attributes: { header: 1 } },
// //       { insert: '\n' },
// //     ]);
// //     documentList.push([newDoc]);
// //     bindEditor(newDoc);
// //     setDocs([...currentDocs, <>:)</>]);
// //     console.log(setDocs);
// //   };
// //   useEffect(() => {
// //     onCreateNewDocument();
// //   }, []);
// //   const onClearDocuments = () => {
// //     // remove all documents
// //     documentList.delete(0, documentList.length);
// //   };
// //   // const onAddDocument = () => {
// //   //   // The index is a number, render the $i-th document
// //   //   // const index = Number.parseInt(val, 10);
// //   //   // bindEditor(documentList.get(index));
// //   // };

// //   return (
// //     <>
// //       <div>
// //         Your username:{' '}
// //         <input
// //           type="text"
// //           value={username}
// //           onChange={onChangeUsername}
// //           onClick={() => onCreateNewDocument()}
// //         />
// //       </div>
// //       <button
// //         type="button"
// //         // onClick={() => onAddDocument()}
// //       >
// //         + Create New Document
// //       </button>
// //       <button type="button" onClick={() => onClearDocuments()}>
// //         - Delete All
// //       </button>

// //       <UsersDiv ref={usersRef}>map</UsersDiv>
// //       <Docs ref={docsRef} />
// //       <Editor ref={editorRef} />
// //     </>
// //   );
// // }
// // export default Quil;
// // const UsersDiv = styled.div`
// //   font-weight: bold;
// // `;
// // const Docs = styled.div`
// //   margin: '1em';
// // `;
// // const Editor = styled.div`
// //   min-height: 200px;
// //   & :nth-child(1) {
// //     font-weight: bold;
// //   }
// // `;

// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Toolbar from '@material-ui/core/Toolbar';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import SearchIcon from '@material-ui/icons/Search';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { Link } from '@reach/router';
// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import Avatar from 'react-avatar';
// import { Cookies, useCookies } from 'react-cookie';
// import Font from 'react-font';
// import { DarkModeSwitch } from 'react-toggle-dark-mode';
// import { v1 as uuid } from 'uuid';

// import { CustomThemeContext } from './CustomeThemeProvider.js';

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   title: {
//     flexGrow: 1,
//   },
//   search: {
//     color: 'white',
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'white',
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'white',
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'white',
//     },
//   },
//   dropdown: {
//     color: 'white',
//   },
//   place: {
//     color: 'secondary',
//   },
// }));

// export default function MyAppBar(props) {
//   const classes = useStyles();

//   const { currentTheme, setTheme } = useContext(CustomThemeContext);
//   const isDark = Boolean(currentTheme === 'dark');

//   console.log('From Home : ', currentTheme);

//   const id = uuid();

//   const [cookie, setCookie] = useCookies(['']);
//   const cookies = new Cookies();
//   const userCookie = cookies.get('userCookie');
//   console.log('MYAPPBAR...');
//   const [isAuthor, setAuthor] = React.useState(true);
//   const [unfinishedBook, setUnfinishedBook] = React.useState(false);
//   const API_URL = process.env.REACT_APP_BACKEND_URL;
//   const clientId = process.env.REACT_APP_CLIENT_ID;

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     if (userCookie !== undefined) {
//       // const email = userCookie.email;
//       // axios
//       //   .get(`${API_URL}/checkauthor?` + queryString.stringify({ email }))
//       //   .then((res) => {
//       //     console.log(res.data);
//       //     res.data ? setAuthor(true) : setAuthor(false);
//       //     console.log("Value : ", isAuthor);
//       //   })
//       //   .catch((err) => console.log(err));
//       // axios
//       //   .get(`${API_URL}/count/unfinished?` + queryString.stringify({ email }))
//       //   .then((res) => {
//       //     console.log(res.data);
//       //     if (res.data.count >= 3) {
//       //       setUnfinishedBook(true);
//       //     } else {
//       //       setUnfinishedBook(false);
//       //     }
//       //   })
//       //   .catch((err) => console.log(err));
//     }
//   }, [props.render]);

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const logout = () => {
//     // const { cookies } = this.props;
//     cookies.remove('userCookie');
//     window.location.href = '/';
//     // return false;
//   };
//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       {isAuthor ? (
//         <MenuItem
//           component={Link}
//           to={`profile/${userCookie ? userCookie.email : ''}`}
//           onClick={handleMenuClose}
//         >
//           My Profile
//         </MenuItem>
//       ) : null}

//       <MenuItem component={Link} to="/editprofile" onClick={handleMenuClose}>
//         {' '}
//         Edit Profile{' '}
//       </MenuItem>
//       <MenuItem
//         onClick={() => {
//           handleMenuClose();
//           logout();
//         }}
//       >
//         Logout
//       </MenuItem>
//     </Menu>
//   );

//   const responseGoogle = (response) => {
//     console.log(response);
//     const authCookie = {
//       email: response.profileObj.email,
//       name: response.profileObj.name,
//       GID: response.googleId,
//     };
//     console.log(authCookie);
//     setCookie('userCookie', authCookie);
//     axios
//       .post(`${API_URL}/addreader`, authCookie)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     props.setRender(!props.render);
//     window.location.reload();
//   };

//   const fail = (res) => {
//     console.log('Failed ', res);
//   };

//   const [open, setOpen] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [pic, setPic] = useState('');
//   const loading = open && options.length === 0;
//   const CloudName = process.env.REACT_APP_CLOUD_NAME;
//   // const navigate = useNavigate();

//   const gotoProfile = (option) => {
//     console.log(option);
//     // navigate(`/profile/${option.email}`);
//     window.location.reload();
//   };

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     (async () => {
//       let option;
//       axios
//         .get(`${API_URL}/authorlist?name=${inputValue}`)
//         .then((res) => {
//           option = res.data;
//           console.log(option);

//           if (active) {
//             setOptions(option);
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading, inputValue, setInputValue]);

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   const [isDarkMode, setDarkMode] = React.useState(false);

//   const toggleDarkMode = (checked) => {
//     if (checked) {
//       setTheme('dark');
//     } else {
//       setTheme('normal');
//     }
//   };

//   return (
//     <div className={classes.grow}>
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <Font family="Viga">
//             <Button
//               size="medium"
//               href="/"
//               style={{
//                 color: 'white',
//                 fontSize: '20px',
//                 fontFamily: 'Viga',
//                 fontStyle: 'italic',
//               }}
//             >
//               eBook
//             </Button>
//           </Font>

//           <Autocomplete
//             className={classes.search}
//             id="asynchronous-demo"
//             style={{ width: 450, marginLeft: '100px' }}
//             open={open}
//             onOpen={() => {
//               setOpen(true);
//             }}
//             onClose={() => {
//               setOpen(false);
//             }}
//             disableClearable
//             forcePopupIcon={false}
//             getOptionSelected={(option, value) => option.Name === value.Name}
//             options={options}
//             onChange={(event, value) => {
//               console.log(value);
//               gotoProfile(value);
//             }}
//             getOptionLabel={(option) => option.Name}
//             renderOption={(option) => {
//               console.log('option: ', option);
//               const dp = `https://res.cloudinary.com/${CloudName}/image/upload/v1617627637/${option.picUrl}.jpg`;
//               console.log('pic : ', option.picUrl);
//               return (
//                 <>
//                   {option.picUrl === '' ? (
//                     <Avatar
//                       name={option.Name[0]}
//                       size="50"
//                       font-size="35"
//                       round
//                       color="Slateblue"
//                       style={{ marginRight: '20px' }}
//                     />
//                   ) : (
//                     <Avatar
//                       src={dp}
//                       round
//                       size="50"
//                       style={{ marginRight: '20px' }}
//                     />
//                   )}
//                   {option.Name}
//                 </>
//               );
//             }}
//             loading={loading}
//             onInputChange={(event, newInputValue) => {
//               setInputValue(newInputValue);
//               console.log('newInputValue : ', newInputValue);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 className={classes.place}
//                 {...params}
//                 SelectProps={{ classes: { dropdown: classes.dropdown } }}
//                 size="small"
//                 variant="outlined"
//                 placeholder="Search Author's Profile"
//                 InputProps={{
//                   ...params.InputProps,
//                   endAdornment: (
//                     <>
//                       {/* {loading ? (
//                         <CircularProgress color="inherit" size={20} />
//                       ) : null} */}
//                       {params.InputProps.endAdornment}
//                       <InputAdornment
//                         position="end"
//                         style={{ paddingRight: '7px' }}
//                       >
//                         <SearchIcon />
//                       </InputAdornment>
//                     </>
//                   ),
//                 }}
//               />
//             )}
//           />

//           <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
//             <DarkModeSwitch
//               style={{ height: '30px', marginTop: '10px', marginRight: '20px' }}
//               checked={isDark}
//               onChange={toggleDarkMode}
//               size={35}
//             />

//             {/* {userCookie == undefined ? null : isAuthor ? (
//               unfinishedBook ? (
//                 <Button
//                   size="large"
//                   href="/"
//                   style={{ paddingRight: '20px', color: 'white' }}
//                   onClick={() => alert('Already 3 unfinished book.')}
//                 >
//                   Create New Book
//                 </Button>
//               ) : (
//                 <Button
//                   size="large"
//                   href={`/edit/${id}`}
//                   style={{ paddingRight: '20px', color: 'white' }}
//                 >
//                   Create New Book
//                 </Button>
//               )
//             ) : (
//               <Button
//                 size="large"
//                 href="/editprofile"
//                 style={{ paddingRight: '20px', color: 'white' }}
//               >
//                 Create New Book
//               </Button>
//             )} */}

//             {userCookie === undefined ? (
//               // <GoogleLogin
//               //   clientId={client_id}
//               //   buttonText=""
//               //   onSuccess={responseGoogle}
//               //   onFailure={fail}
//               //   size="medium"
//               //   href="/"
//               //   render={(renderProps) => (
//               //     <GoogleOutlined
//               //       onClick={renderProps.onClick}
//               //       disabled={false} // disabled={renderProps.disabled}
//               //       style={{ fontSize: '30px' }}
//               //     />
//               //   )}
//               // >
//                 {/* <Link to="/"> </Link> */}
//               // </GoogleLogin>
//               <div>구글 로그인</div>
//             ) : (
//               <IconButton
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleProfileMenuOpen}
//                 color="inherit"
//                 size="large"
//               >
//                 <AccountCircle />
//               </IconButton>
//             )}
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//     </div>
//   );
// }
