import { OperationalTransformation } from 'ot-js';

interface ConflictResolverProps {
  userId: string;
  cursorPosition: number;
  userName: string;
  userColor: string;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({
  userId,
  cursorPosition,
  userName,
  userColor,
}) => {
  const ot = new OperationalTransformation();

  useEffect(() => {
    ot.applyOperation(userId, cursorPosition);
  }, [userId, cursorPosition]);

  return null;
};

export default ConflictResolver;