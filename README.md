# Use GitHub Token action

This action configures git to use an access token.

You can obtain a personal access token in the [develop settings page](https://github.com/settings/tokens).

---

## Inputs

### `authentication`

**Required** The authentication value used for authenticating against github.com.


### `name`

**Optional** The `user.name` git config value.

### `email`

**Optional** The `user.email` git config value.

## Example usage

```yaml
uses: frankdejonge/use-github-token
with:
  authentication: 'your_username:${{ secrets.YOUR_SECRET_TOKEN }}'
```

Optional values:

```yaml
uses: frankdejonge/use-github-token
with:
  authentication: 'your_username:${{ secrets.YOUR_SECRET_TOKEN }}'
  name: 'Your Name'
  email: 'your-email@example.com'
```
