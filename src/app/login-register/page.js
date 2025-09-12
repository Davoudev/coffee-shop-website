"use client";
import styles from "@/styles/login-register.module.css";
import { useState } from "react";
import { authTypes } from "@/utils/constants";

import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import Image from "next/image";

const login_register = () => {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showloginForm={showloginForm} />
        )}
      </div>
      <section>
        <Image
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt="Coffee and brain"
          layout="fill"
          objectFit="cover"
        />
      </section>
    </div>
  );
};

export default login_register;
