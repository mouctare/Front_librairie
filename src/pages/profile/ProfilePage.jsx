import React from "react";
import UserService from "../../services/user.service";
import { Role } from "../../models/role";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    if (!UserService.currentUserValue) {
      this.props.history.push("/login");
      return;
    }

    this.state = {
      user: UserService.currentUserValue,
    };
  }

  changeRole() {
    const { user } = this.state;
    const newRole = user.role === Role.ADMIN ? Role.USER : Role.ADMIN;
    UserService.changeRole(user.username, newRole).then((response) => {
      user.role = response.data.role;
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.setState({ user: user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hello, {user.name}!</h1>
        <p className="lead">
          Il s'agit d'une simple application de gestion d'une librairie..
        </p>
        <hr className="my-4" />

        {/*  <p>
          Votre role actuel <strong>{user.role}</strong>
          Si vous souhaitez la modifier, vous pouvez utiliser le bouton
          ci-dessous..
        </p> */}
        {!user.role === "ROLE_USER" && (
          <button className="btn btn-primary" onClick={() => this.changeRole()}>
            Change Role
          </button>
        )}
      </div>
    );
  }
}

export { ProfilePage };
