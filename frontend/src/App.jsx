import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Signup, Login, AppLayout, BookDetails, Library, Collections, Clubs, CollectionDetails, ClubDetails, Moderation, Users, ReadingDetails, ReadingPlaylist, TrackingPlaylist, BookDiscussions } from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* public route */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* protected route */}
        <Route path="/app" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
        />
        <Route path="/app/book/:id" element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
        />
        <Route path="/app/library" element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        }
        />
        <Route path="/app/collections" element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        }
        />
        <Route path="/app/collections/:id" element={
          <ProtectedRoute>
            <CollectionDetails />
          </ProtectedRoute>
        }
        />
        <Route path="/app/clubs" element={
          <ProtectedRoute>
            <Clubs />
          </ProtectedRoute>
        }
        />
        <Route path="/app/clubs/:id" element={
          <ProtectedRoute>
            <ClubDetails />
          </ProtectedRoute>
        }
        />
        <Route path="/app/moderation" element={
          <ProtectedRoute>
            <Moderation />
          </ProtectedRoute>
        }
        />
        <Route path="/app/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
        />
        <Route
          path="/app/reading/:id"
          element={
            <ProtectedRoute>
              <ReadingDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/reading"
          element={
            <ProtectedRoute>
              <ReadingPlaylist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/tracking/:type"
          element={
            <ProtectedRoute>
              <TrackingPlaylist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/book/:id/discussions"
          element={
            <ProtectedRoute>
              <BookDiscussions />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;