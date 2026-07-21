# Modelagem do Banco

## Entidades

### User

- id
- name
- email
- password
- createdAt

### Category

- id
- name

### Ad

- id
- title
- description
- price
- imageUrl
- isDonation
- createdAt
- categoryId
- userId

## Relacionamentos

User 1:N Ad

Category 1:N Ad