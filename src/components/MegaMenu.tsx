"use client";

import React, { useState } from "react";
import { Flex, Row, Column, Text, Button, Line, Icon, Background } from "@once-ui-system/core";
import { person, routes, work } from "@/resources";

export const MegaMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{ position: "relative" }}
        >
            {/* Dropdown Trigger */}
            <Button
                variant="tertiary"
                size="m"
                weight="default"
                suffixIcon={isOpen ? "chevronUp" : "chevronDown"}
            >
                Solutions
            </Button>

            {/* Mega Menu Content (Floating Panel) */}
            {isOpen && (
                <Flex
                    position="absolute"
                    zIndex={9}
                    padding="16"
                    radius="l"
                    background="surface"
                    border="neutral-alpha-medium"
                    shadow="xl"
                    direction="column"
                    gap="24"
                    style={{
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "16px",
                        minWidth: "600px",
                        backdropFilter: "blur(24px)"
                    }}
                >
                    {/* Subtle animated background inside the dropdown */}
                    <Background
                        mask={{ x: 50, y: 0, radius: 100 }}
                        gradient={{
                            display: true,
                            opacity: 30,
                            x: 50,
                            y: -50,
                            width: 100,
                            height: 100,
                            tilt: 0,
                            colorStart: "brand-background-strong",
                            colorEnd: "static-transparent",
                        }}
                    />

                    <Row gap="24" fillWidth>
                        {/* Left Column: Core Infrastructure */}
                        <Column flex={1} gap="16">
                            <Row vertical="center" gap="8">
                                <Icon name="grid" size="m" onBackground="brand-strong" />
                                <Text variant="body-strong-m">Infrastructure</Text>
                            </Row>
                            <Line background="neutral-alpha-medium" />

                            <Button href="/work/browserforge" variant="tertiary">
                                <Column gap="4" align="start">
                                    <Text variant="body-strong-s">BrowserForge Engine</Text>
                                    <Text variant="body-default-xs" onBackground="neutral-weak">Chromium Cloud Compilers</Text>
                                </Column>
                            </Button>

                            <Button href="/about" variant="tertiary">
                                <Column gap="4" align="start">
                                    <Text variant="body-strong-s">Job Queue</Text>
                                    <Text variant="body-default-xs" onBackground="neutral-weak">Firebase Build Dispatcher</Text>
                                </Column>
                            </Button>
                        </Column>

                        {/* Right Column: Applications & Demo */}
                        <Column flex={1} gap="16">
                            <Row vertical="center" gap="8">
                                <Icon name="sparkle" size="m" onBackground="accent-strong" />
                                <Text variant="body-strong-m">Products</Text>
                            </Row>
                            <Line background="neutral-alpha-medium" />

                            <Button href="http://localhost:5173" target="_blank" variant="secondary">
                                <Column gap="4" align="start">
                                    <Text variant="body-strong-s" onBackground="accent-strong">Live Dashboard &rarr;</Text>
                                    <Text variant="body-default-xs" onBackground="neutral-weak">Manage your browser fleet</Text>
                                </Column>
                            </Button>
                        </Column>
                    </Row>

                    <Line background="neutral-alpha-medium" />

                    <Row fillWidth vertical="center" horizontal="between">
                        <Text variant="body-default-xs" onBackground="neutral-weak">
                            Powered by Once UI & BrowserForge Architecture
                        </Text>
                        <Button size="s" variant="primary" href="mailto:founder@browserforge.corp">
                            Contact Sales
                        </Button>
                    </Row>
                </Flex>
            )}
        </div>
    );
};
