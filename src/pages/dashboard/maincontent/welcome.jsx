export default function WelcomeHeader({ userName, mainGoal }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Welcome{userName ? `, ${userName}` : ""}</h1>
      {mainGoal && (
        <p className="mt-1 text-sm text-gray-500">
          Your goal: <span className="font-medium text-indigo-600">{mainGoal}</span>
        </p>
      )}
    </div>
  );
}