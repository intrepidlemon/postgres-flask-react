# Setup

## Prerequisites
- docker
- yarn

## Setup

### Backend
```sh
make docker
make setup-sql
make upgrade-sql
```

### Front end

```sh
cd view
yarn install
```

## Running the project
```sh
make server
```

## AWS

requires the following permissions
- SES
    - for password reset
