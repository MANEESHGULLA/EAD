import React from "react";

function App() {
  const [password, setPassword] = React.useState("");
  const [strength, setStrength] = React.useState("");
  const [score, setScore] = React.useState(0);

  const checkStrength = (pass) => {
    setPassword(pass);

    let tempScore = 0;

    if (pass.length >= 8) tempScore++;
    if (/[A-Z]/.test(pass)) tempScore++;
    if (/[0-9]/.test(pass)) tempScore++;
    if (/[a-z]/.test(pass)) tempScore++;
    if (/[^A-Za-z0-9]/.test(pass)) tempScore++;

    setScore(tempScore);

    switch (tempScore) {
      case 0:
      case 1:
        setStrength("very weak");
        break;
      case 2:
        setStrength("weak");
        break;
      case 3:
        setStrength("medium");
        break;
      case 4:
        setStrength("strong");
        break;
      case 5:
        setStrength("very strong");
        break;
      default:
        setStrength("");
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="pass">
          <label>Password: </label>
          <input
            onChange={(e) => checkStrength(e.target.value)}
            type="password"
            placeholder="Enter password"
          />
        </div>

        <div className="strength">
          <h2>Password Strength:</h2>
          <h3
            className={
              strength === "very weak"
                ? "veryweak"
                : strength === "weak"
                ? "weak"
                : strength === "medium"
                ? "medium"
                : strength === "strong"
                ? "strong"
                : strength === "very strong"
                ? "verystrong"
                : ""
            }>
            {strength}
          </h3>

          <ul className="entirelist">
            <li className={password.length >= 8 ? "veryweak" : ""}>
              Password must be at least 8 characters long
            </li>
            <li className={/[A-Z]/.test(password) ? "weak" : ""}>
              Password must contain at least one uppercase letter (A-Z)
            </li>
            <li className={/[a-z]/.test(password) ? "medium" : ""}>
              Password must contain at least one lowercase letter (a-z)
            </li>
            <li className={/[0-9]/.test(password) ? "strong" : ""}>
              Password must contain at least one digit (0-9)
            </li>
            <li className={/[^A-Za-z0-9]/.test(password) ? "verystrong" : ""}>
              Password must contain at least one special character (e.g.
              !@#$%^&*)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

/* :root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 40%;
  height: auto;
  background: white;
  box-shadow: 2px 5px 10px rgb(86, 85, 85);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pass {
  height: auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.veryweak {
  color: red;
}
.weak {
  color: rgb(244, 190, 190);
}

.medium {
  color: orange;
}
.strong {
  color: rgb(163, 235, 163);
}
.verystrong {
  color: darkgreen;
} */
