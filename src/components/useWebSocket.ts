import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUsers } from './useUsers';
import { useEditor } from './useEditor';
import { useCursor } from './useCursor';

const socket = io();

const useWebSocket = () => {
   const [users, setUsers] = useState([]);
   const [editorState, setEditorState] = useState('');
   const [cursorPositions, setCursorPositions] = useState({});
   const { users: connectedUsers } = useUsers();
   const { editorState: localEditorState } = useEditor();
   const { cursorPosition } = useCursor();

   useEffect(() => {
      socket.on('connect', () => {
         console.log('Connected to server');
      });

      socket.on('disconnect', () => {
         console.log('Disconnected from server');
      });

      socket.on('join', (user) => {
         setUsers((prevUsers) => [...prevUsers, user]);
      });

      socket.on('leave', (user) => {
         setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
      });

      socket.on('update', (data) => {
         setEditorState(data.editorState);
         setCursorPositions(data.cursorPositions);
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   useEffect(() => {
      if (localEditorState !== editorState) {
         socket.emit('update', { editorState, cursorPositions });
      }
   }, [localEditorState, editorState, cursorPositions]);

   return { users, editorState, cursorPositions };
};

export default useWebSocket;