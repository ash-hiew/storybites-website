import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
}

const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
}

const config = {
  type: "spring",
  damping: 30,
  stiffness: 60
};

const Layout = ({ children }: Props): JSX.Element => (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={config}
            className="mx-auto py-8 md:py-16 lg:py-24"
        >
            {children}
        </motion.div>
)

export default Layout