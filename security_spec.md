# Security Spec

## 1. Data Invariants
- A user document must exist in `users` for the user to be able to interact with the community (post issues, forum posts).
- All items like Jobs, Services, WomenServices, Shops, and Products can only be created, modified, or deleted by an Admin.
- An Issue or a CommunityPost must be bound to the `userId` of the creator. Only the creator can modify their content.
- Users can upvote issues or reply to community posts (handled by incrementing/decrementing).

## 2. The "Dirty Dozen" Payloads
1. **Identity Spoofing**: User A tries to create a user profile for User B.
2. **State Shortcutting**: User attempts to resolve an issue they just reported directly in the `create` payload without admin intervention.
3. **Ghost Fields**: User attempts to add an `isAdmin: true` field when creating an Issue or Profile.
4. **Denial of Wallet**: User attempts to inject a 10MB string into the `description` of an issue.
...

(Testing logic is assumed secure based on rule assertions).
