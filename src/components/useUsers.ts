{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface useUsersProps {
  editor: any;
}

const useUsers = ({ editor }: useUsersProps) => {
  const { state, dispatch } = useEditor(editor);
  // ... implementation ...
}

export default useUsers;