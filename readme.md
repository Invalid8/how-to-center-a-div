
# How to Center a Div

This project provides a server-based solution to search for and display information on how to center a div using Google Custom Search API.

## Project Structure

- `.vercel/`: Contains Vercel configuration files.
- `api/`: Contains the serverless function for handling the search requests.
  - `search.ts`: Main serverless function for querying Google Custom Search API.
- `public/`: Public assets for the project.
  - `asset/`: Contains image assets.
  - `avatar.png`: An example image.
- `src/`: Source files for the project.
  - `index.html`: Main HTML file.
  - `manifest.json`: Web app manifest file.
  - `output.css`: Compiled CSS file.
  - `script.js`: Main JavaScript file.
  - `style.css`: Main CSS file.
- `.env`: Environment variables file (not included in the repository).
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Contains project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `tailwind.config.js`: Configuration file for Tailwind CSS.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Invalid8/how-to-center-a-div.git
   cd how-to-center-a-div
   ```
2. Install dependencies:

   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Google Custom Search API credentials:

   ```plaintext
   API_KEY=your_google_api_key
   CX=your_google_custom_search_engine_id
   ```
4. Deploy the project on Vercel:

   ```sh
   vercel
   ```

## Usage

Once deployed, the serverless function will handle requests to fetch search results related to centering a div. The function is defined in `api/search.ts` and works as follows:

1. Extracts the `limit` and `page` query parameters from the request.
2. Constructs the search URL using Google Custom Search API credentials.
3. Fetches the search results and returns them in the response.

### Example Request

```http
GET /api/search?limit=10&page=1
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE]() file for details.

## Acknowledgments

* [Google Custom Search API]()
* [Vercel](https://vercel.com/)
