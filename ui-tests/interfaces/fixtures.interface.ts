import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {NewClientPage} from "../pages/newClientPage";

export interface LoginPageFixture {
    loginPage: LoginPage;
}

export interface HomePageFixture {
    homePage: HomePage;
}

export interface NewClientPageFixture {
    newClientPage: NewClientPage;
}