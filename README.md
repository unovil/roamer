# Leo's Roamer

This is a website dedicated to seamless school function through the efficient management of school equipment and facilities, used by both students and administrators.

## Roadmap

- [x] Create a basic website with the following features:
  - [x] A database
  - [x] A homepage
  - [x] A login or registration page that redirects into homepage
- [x] Create a basic database with the following features:
  - [x] A user table with the following:
    - [x] Email
    - [x] Password (not in plain text!)
    - [x] Name
    - [x] Section (to be approved by admin)
  - [x] An equipment table
  - [x] A facilities table
  - [x] A booking table
- [ ] The homepage should have the following features:
  - [ ] A search bar for equipment, facilities, and people
  - [ ] A "welcome" with your LRN and the class you're part of
  - [ ] A "recently booked" section
- [ ] When borrowing, it should have the options:
  - [ ] What to borrow?
  - [ ] What range of time to borrow? Display calendar here
  - [ ] Who will borrow? Yourself only by default, add people from same section or other sections (has to be approved by the others, unless it's the whole section and you're the president)
  - [ ] Who will be concerned? Each facility or equipment has at least one person concerned

## Contribution and Reproduction

1. Clone the repository
2. Install XAMPP or another equivalent software to use MySQL
3. Load the project dependencies with `npm install`
4. Create a table in MySQL, then in a root `.env` file create a `DATABASE_URL` containing the database connection string (more on Prisma docs)
5. Push+Generate Prisma with `npx prisma migrate`
6. Run the project with `npm run dev`
