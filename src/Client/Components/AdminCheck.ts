// // import axios from "axios";
// // import { Navigate } from "react-router-dom";
// // import React, { useState, useEffect } from "react";

// // interface RouteProtectionProps {
// //     admin: boolean;
// //     children: React.ReactNode;
// // }

// // const AdminCheck: React.FC<RouteProtectionProps> = ({ admin, children }) => {
// //     // const [permission, setPermission] = useState<boolean | null>(null);

// //     if (admin === false) {
// //         return <Navigate to="/" />;
// //     } else {
// //         return {children}
// //     }
// // };

// // export default AdminCheck;

// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// interface RouteProtectionProps {
//     admin: boolean;
//     children: React.ReactNode;
// }

// const AdminCheck: React.FC<RouteProtectionProps> = ({ admin, children }) => {
//     // const [permission, setPermission] = useState<boolean | null>(null);

//     if (!admin) {
//         return <Navigate to="/" />;
//     } else {
//         return <>{children}</>;
//     }
// };

// export default AdminCheck;
