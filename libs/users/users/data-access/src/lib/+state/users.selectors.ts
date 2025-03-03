import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersFilter = createSelector(selectUsersState, (state: UsersState) => state.usersFilter);

export const selectFilteredUsers = createSelector(selectUsersFilter, selectAllUsers, (usersFilter, allUsers) => {
  if (!usersFilter.name?.trim()) return allUsers;
  return allUsers.filter((user) => user.name.toLowerCase().includes(usersFilter.name.toLowerCase()));
});

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);