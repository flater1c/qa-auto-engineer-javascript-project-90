import { test } from './utils/fixtures.js';

test('user creation', async ({ usersPage, testData }) => {
  await usersPage.proceedToUserCreate();
  await usersPage.verifyInputsVisible([
    usersPage.emailInput,
    usersPage.firstNameInput,
    usersPage.lastNameInput,
    usersPage.saveButton,
  ]);
  await usersPage.fillUserData(
    testData.users.userToCreate.email,
    testData.users.userToCreate.firstName,
    testData.users.userToCreate.lastName,
  );
  await usersPage.verifyEntityExists(testData.users.userToCreate.email);
});

test('users list opens correctly', async ({ usersPage }) => {
  await usersPage.verifyTableHeaders(['Email', 'First Name', 'Last Name']);
});

test('user edit', async ({ usersPage, testData }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.fillUserData(
    testData.users.userToEdit.email,
    testData.users.userToEdit.firstName,
    testData.users.userToEdit.lastName,
  );
  await usersPage.verifyEntityExists(testData.users.userToEdit.email);
});

test('user edit email validation', async ({ usersPage, testData }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.fillUserData(
    testData.users.userToEditInvalid.email,
    testData.users.userToEditInvalid.firstName,
    testData.users.userToEditInvalid.lastName,
  );
  await usersPage.verifyEntityExists(testData.users.userToEditInvalid.errorMessage);
});

test('delete user', async ({ usersPage }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.deleteUser();
});

test('bulk delete users', async ({ usersPage }) => {
  await usersPage.bulkDeleteEntities(() => usersPage.getTableRows());
});
